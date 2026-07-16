# COVU website — static HTML

Plain static site. No build step, no framework. The repo IS the website:
each page is a folder with an index.html; /images and /videos are shared.

## Structure
    /index.html                       -> /
    /images/                          -> shared images (/images/name.png)
    /videos/                          -> shared videos (/videos/name.mp4)
    (add later) /about/index.html     -> /about
    (add later) /os/index.html        -> /os
    (add later) /solutions/capacity/index.html -> /solutions/capacity

## Add a page
Create <route>/index.html (e.g. about/index.html) and commit. It goes live at /<route>.

## Add an image or video
Upload into /images or /videos, commit, then reference as /images/name.png or /videos/name.mp4.
Use lowercase-with-hyphens names, no spaces.

## Deploy (Vercel)
Import this repo into a Vercel project. No build settings needed — Vercel serves the files.
Every commit auto-redeploys. (Optional vercel.json included for clean routing.)
