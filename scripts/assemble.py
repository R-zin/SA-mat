import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.abspath("."))

from mod1 import get_mod1
from mod2 import get_mod2
from mod3 import get_mod3
from mod4 import get_mod4
from mod5 import get_mod5
from mod6 import get_mod6
from mod7 import get_mod7
from mod8 import get_mod8
from mod9 import get_mod9

modules = [
    get_mod1(),
    get_mod2(),
    get_mod3(),
    get_mod4(),
    get_mod5(),
    get_mod6(),
    get_mod7(),
    get_mod8(),
    get_mod9(),
]

header = """export interface SubSection {
  id: string;
  title: string;
  badge?: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  formula?: {
    latex: string;
    explanation: string;
  };
  table?: {
    headers: string[];
    rows: (string | number)[][];
  };
  callout?: {
    type: "spruce" | "amber" | "pine" | "slate";
    title: string;
    text: string;
  };
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  ects: string;
  readTime: string;
  updated: string;
  sourceSlide: string;
  slideUrl: string;
  summary: string;
  tags: string[];
  subsections: SubSection[];
}

export const MODULES: ModuleData[] = """

json_content = json.dumps(modules, indent=2)

full_content = header + json_content + ";\n"

with open("src/data/modules.ts", "w", encoding="utf-8") as f:
    f.write(full_content)

print(f"Successfully assembled {len(modules)} modules into src/data/modules.ts ({len(full_content)} chars)")
