const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const file = process.argv[2];

if (!file) {
  console.error("❌ Please provide a file name, e.g. npm run watch -- 3.2.ts");
  process.exit(1);
}

const fullPath = path.join("src", file);

if (!fs.existsSync(fullPath)) {
  console.error(`❌ File not found: ${fullPath}`);
  process.exit(1);
}

console.log(`🚀 Watching file: ${file}`);

spawn(
  path.join("node_modules", ".bin", "ts-node-dev"),
  ["--respawn", "--transpile-only", "--watch", "src", fullPath],
  { stdio: "inherit", shell: true }
);
