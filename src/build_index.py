"""
build_index.py
Two modes:
  python build_index.py extract   -- split index.html into screen files
  python build_index.py rebuild   -- rebuild index.html from screen files (reverse)
"""
import os, sys, re

INDEX_FILE = 'index.html'

# Screen registry: id -> (group_folder, filename_slug)
SCREEN_MAP = {
    's1':  ('vb-den',  's1-danh-sach'),
    's2':  ('vb-den',  's2-tiep-nhan'),
    's3':  ('vb-den',  's3-chi-tiet'),
    's4':  ('vb-den',  's4-chi-dao'),
    's5':  ('vb-den',  's5-dang-xu-ly'),
    's6':  ('vb-den',  's6-hoan-thanh'),
    's7':  ('vb-den',  's7-thiet-lap-luong'),
    's8':  ('vb-di',   's8-danh-sach'),
    's9':  ('vb-di',   's9-soan-thao'),
    's10': ('vb-di',   's10-duyet-song-song'),
    's11': ('vb-di',   's11-ky-so'),
    's12': ('vb-di',   's12-cap-so-ban-hanh'),
    's13': ('vb-di',   's13-da-ban-hanh'),
    's14': ('noi-bo',  's14-danh-sach'),
    's15': ('noi-bo',  's15-tao-moi'),
    's16': ('ho-so',   's16-danh-sach'),
    's17': ('ho-so',   's17-tao-ho-so'),
    's18': ('ho-so',   's18-chi-tiet'),
    's19': ('ho-so',   's19-nop-luu'),
    's20': ('so-bc',   's20-so-dang-ky'),
    's21': ('so-bc',   's21-cau-hinh-so'),
    's22': ('so-bc',   's22-bao-cao'),
}

def extract_screens():
    with open(INDEX_FILE, encoding='utf-8') as f:
        lines = f.readlines()

    # Find screen boundaries by scanning for <div class="screen[^"]*" id="sN">
    # and matching the closing </div> via depth counting
    screen_ranges = {}  # id -> (start_line, end_line) 0-based inclusive

    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.search(r'<div\s+class="screen[^"]*"\s+id="(s\d+)"', line)
        if m:
            sid = m.group(1)
            start = i
            depth = 0
            j = i
            while j < len(lines):
                depth += lines[j].count('<div')
                depth -= lines[j].count('</div>')
                if depth == 0:
                    screen_ranges[sid] = (start, j)
                    i = j + 1
                    break
                j += 1
            continue
        i += 1

    print(f'Found {len(screen_ranges)} screens.')

    # Create directories and write files
    for sid, (group, slug) in SCREEN_MAP.items():
        if sid not in screen_ranges:
            print(f'  WARNING: {sid} not found in index.html')
            continue
        start, end = screen_ranges[sid]
        content = ''.join(lines[start:end+1])
        out_dir = os.path.join('screens', group)
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, slug + '.html')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        line_count = end - start + 1
        print(f'  Wrote {out_path} ({line_count} lines, {start}-{end})')

    print('\nDone! All screen files extracted to screens/')
    print('Line ranges summary:')
    for sid in sorted(screen_ranges, key=lambda x: int(x[1:])):
        start, end = screen_ranges[sid]
        print(f'  {sid}: lines {start+1}-{end+1} ({end-start+1} lines)')

if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'extract'
    if mode == 'extract':
        extract_screens()
    else:
        print('Unknown mode. Use: extract')
