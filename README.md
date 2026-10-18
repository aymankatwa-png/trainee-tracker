# غرفة التحرير — Moomken Media Center Trainee Tracker

A general (not per-person) tracker for Media Center trainees taking the
**Creative Copywriter Course** (ilovecreatives): 4 sections over 8 weeks, counted
from each trainee's own start date.

- **Live:** https://aymankatwa-png.github.io/trainee-tracker/
- **Trainee:** «أنا متدرّب / أنا متدرّبة» → name (it goes on the certificate) → «إعدادات الحفظ» → Gist ID + token.
  Each trainee gets an auto-generated file (`trainee-xxxx.json`); copy it to a second device from the same panel.
- **Mentor:** «أنا المشرف» → PIN → Gist ID + token once. «مكتب المشرف» lists every trainee file in the gist,
  shows progress and pending work, and approves tasks.
- **Sync:** one private Gist for all trainees. Writes are read → merge → write, per task, so a mentor
  approval and a trainee update never overwrite each other.
- **Course kit:** files in OneDrive → `Trainee Kit` (open + download links). Trainees need access to that folder.
- **Certificate:** unlocks when every task is approved; prints A4 landscape from the page.

Edit content at the top of `app.js` (`SECTIONS`, `KIT`, `DRAFTS`). Bump `?v=` in `index.html` after edits.
Never commit the token.
