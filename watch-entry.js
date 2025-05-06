const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const file = process.argv[2];

if (!file) {
  console.log("📂 Found In src:\n");

  // Recursive .ts file fetcher
  function listTSFiles(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(prefix, entry.name);
      if (entry.isDirectory()) {
        listTSFiles(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".ts")) {
        console.log(`- ${relativePath}`);
      }
    }
  }

  listTSFiles("src");
  console.log("\n❗ Example : npm run watch -- utils/helper.ts");
  process.exit(0);
}

const fullPath = path.normalize(path.join("src", file));

if (!fs.existsSync(fullPath)) {
  console.error(`❌ ফাইল পাওয়া যায়নি: ${fullPath}`);
  process.exit(1);
}

console.log(`🚀 Watching file: ${file}`);

spawn(
  path.join("node_modules", ".bin", "ts-node-dev"),
  ["--respawn", "--transpile-only", "--watch", "src", fullPath],
  {
    stdio: "inherit",
    shell: true,
  }
);
