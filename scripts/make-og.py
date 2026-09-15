#!/usr/bin/env python3
"""Regenerate the WhatsApp/social preview (app/opengraph-image.jpg, app/twitter-image.jpg)
from the artwork declared in content/art.ts. Run from the repo root:  python3 scripts/make-og.py
Needs Pillow; downloads the two Google fonts on first run."""
import os, re, json, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
art_ts = open(os.path.join(ROOT, "content/art.ts")).read()
def entry(name):
    block = re.search(name + r":\s*\{(.*?)\}", art_ts, re.S).group(1)
    return {k: v for k, v in re.findall(r'(\w+):\s*"?([^",\n]+)"?', block)}
groom, bride, bg = entry("groom"), entry("bride"), entry("background")

FONTS = os.path.join(ROOT, ".fonts")
os.makedirs(FONTS, exist_ok=True)
def font(family, size):
    path = os.path.join(FONTS, family.replace("+", "_").split(":")[0] + ".ttf")
    if not os.path.exists(path):
        css = urllib.request.urlopen(urllib.request.Request(
            f"https://fonts.googleapis.com/css2?family={family}", headers={"User-Agent": "curl"})).read().decode()
        url = re.search(r"https://[^)]+\.ttf", css).group(0)
        urllib.request.urlretrieve(url, path)
    return ImageFont.truetype(path, size)

W, H = 1200, 630
img = Image.new("RGB", (W, H), (245, 244, 237))
wash = Image.new("RGB", (W, H), (245, 244, 237)); wd = ImageDraw.Draw(wash)
wd.ellipse((-220, -160, 480, 380), fill=(236, 226, 214)); wd.ellipse((700, 260, 1420, 820), fill=(250, 224, 216)); wd.ellipse((380, -280, 980, 120), fill=(240, 226, 208))
img = Image.blend(img, wash.filter(ImageFilter.GaussianBlur(90)), 0.85)
noise = Image.effect_noise((W, H), 12).convert("L"); img = Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.06)

pub = lambda p: os.path.join(ROOT, "public", p.lstrip("/"))
b = Image.open(pub(bg["src"])).convert("RGBA")
landscape = bg.get("orientation") == "landscape"
if landscape:
    # cover the whole card, then fade to paper on the left so the text stays readable
    s = max(W / b.width, H / b.height); b = b.resize((int(b.width * s), int(b.height * s)), Image.LANCZOS)
    b = b.crop(((b.width - W) // 2, (b.height - H) // 2, (b.width - W) // 2 + W, (b.height - H) // 2 + H))
    mask = Image.new("L", (W, H), 255); md = ImageDraw.Draw(mask)
    for x in range(W):
        md.line((x, 0, x, H), fill=int(255 * min(1, max(0, (x - 620) / 340))) if x < 960 else 255)
    b.putalpha(mask); img.paste(b, (0, 0), b); bw = W // 2 + 40
else:
    bw = int(b.width * H / b.height); b = b.resize((bw, H), Image.LANCZOS)
    mask = Image.new("L", (bw, H), 255); md = ImageDraw.Draw(mask)
    for x in range(140): md.line((x, 0, x, H), fill=int(255 * x / 140))
    b.putalpha(mask); img.paste(b, (W - bw, 0), b)

fit = lambda im, h: im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
g = Image.open(pub(groom["src"])).convert("RGBA")
if groom["facing"] == "left": g = g.transpose(Image.FLIP_LEFT_RIGHT)   # groom stands left, faces right
r = Image.open(pub(bride["src"])).convert("RGBA")
if bride["facing"] == "right": r = r.transpose(Image.FLIP_LEFT_RIGHT)   # bride stands right, faces left
g = fit(g, int(480 * float(groom.get("scale", 1)))); r = fit(r, int(480 * float(bride.get("scale", 1))))
cx = (W - bw // 2) if not landscape else W - 250; base = H - 42
img.paste(g, (cx - 10 - g.width, base - g.height), g); img.paste(r, (cx - 30, base - r.height), r)

d = ImageDraw.Draw(img)
bark, tan, coral, ink = (87, 52, 30), (140, 100, 70), (232, 135, 122), (51, 35, 28)
script = font("Cormorant+Garamond:wght@600", 78); names = font("Cormorant+Garamond:wght@500", 44)
label = font("Cormorant+Garamond:wght@500", 22); body = font("Cormorant+Garamond:wght@500", 25)
def spaced(x, y, t, f, fill, sp):
    for c in t: d.text((x, y), c, font=f, fill=fill); x += d.textlength(c, font=f) + sp
L = 72
spaced(L, 92, "TOGETHER WITH THEIR FAMILIES", label, tan, 3)
d.text((L - 4, 112), "Wedding Invitation", font=script, fill=bark)
d.text((L, 250), "Mohd. Saif Uddin", font=names, fill=ink)
d.text((L, 300), "&", font=font("Cormorant+Garamond:wght@600", 44), fill=coral)
d.text((L, 340), "Farhat Khatoon", font=names, fill=ink)
d.line((L, 410, L + 120, 410), fill=(161, 121, 90), width=1)
spaced(L, 428, "NIKAH", label, bark, 3);  d.text((L, 452), "Friday, 25 September 2026 · 8 PM · Inam Vihar, Ghaziabad", font=body, fill=ink)
spaced(L, 500, "WALIMA", label, bark, 3); d.text((L, 524), "Saturday, 26 September 2026 · 8 PM · JMD Garden, Aya Nagar, Delhi", font=body, fill=ink)
for out in ("app/opengraph-image.jpg", "app/twitter-image.jpg"):
    img.save(os.path.join(ROOT, out), quality=86, optimize=True, progressive=True)
print("wrote share images:", os.path.getsize(os.path.join(ROOT, "app/opengraph-image.jpg")), "bytes")
