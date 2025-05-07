# 🚀 TypeScript ফাইল ডাইনামিকভাবে চালান ts-node-dev দিয়ে

এই ডকুমেন্টেশনটি আপনাকে দেখাবে কিভাবে শুধুমাত একটি ফাইলের নাম দিয়ে TypeScript কোড রান করতে পারেন — বারবার স্ক্রিপ্ট বদলানোর দরকার নেই! 🧠

---

## ✅ ধাপ ১: প্রজেক্ট সেটআপ করুন

প্রথমে আপনার Node.js প্রজেক্টে `ts-node-dev` ইনস্টল করুন:

```bash
npm install --save-dev ts-node-dev
```

---

## ✅ ধাপ ২: স্ক্রিপ্ট যুক্ত করুন

আপনার `package.json` ফাইলে নিচের মতো একটি স্ক্রিপ্ট যুক্ত করুন:

```json
"scripts": {
  "watch": "node watch-entry.js"
}
```

---

## ✅ ধাপ ৩: `watch-entry.js` ফাইল তৈরি করুন

প্রজেক্টের রুটে একটি নতুন ফাইল তৈরি করুন: `watch-entry.js` এবং নিচের কোডটি কপি-পেস্ট করুন:

```js
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const os = require("os"); // OS detection

// 🚀 System Info
const userSystem = {
  "OS Type": os.type(),
  Platform: os.platform(),
  Release: os.release(),
  Architecture: os.arch(),
  "Total Memory (GB)": (os.totalmem() / 1024 ** 3).toFixed(2),
  "Free Memory (GB)": (os.freemem() / 1024 ** 3).toFixed(2),
  User: os.userInfo().username,
  Hostname: os.hostname(),
  "Uptime (hours)": (os.uptime() / 3600).toFixed(2),
  "CPU Cores": os.cpus().length,
};

console.log("🚀 System Information:");
console.table(userSystem);

// 🧾 File Argument
const file = process.argv[2];

if (!file) {
  console.log("\n📂 Found In Projects:\n");

  // Recursive .ts file fetcher
  function listTSFiles(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(prefix, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        listTSFiles(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".ts")) {
        console.log(`- ${relativePath}`);
      }
    }
  }

  listTSFiles(".");

  // OS-specific run suggestion
  const platform = os.platform();
  const isWindows = platform === "win32";
  const examplePath = path.join("src", "index.ts");

  switch (platform) {
    case "win32":
      console.log("\n🪟 You're on Windows.");
      break;
    case "linux":
      console.log("\n🐧 You're on Linux.");
      break;
    case "darwin":
      console.log("\n🍏 You're on macOS.");
      break;
    default:
      console.log("\n❔ Unknown OS platform.");
  }

  console.log(
    `\n❗ To run your script, use:\n   npm run watch -- ${examplePath}`
  );
  console.log(
    '   Replace "<file>" with one of the .ts files listed above for your system.\n'
  );
  process.exit(0);
}

// 🎯 Validating file existence
const fullPath = path.normalize(path.join(".", file));

if (!fs.existsSync(fullPath)) {
  console.error(`❌ File Not Found: ${fullPath}`);
  process.exit(1);
}

console.log(`🚀 Watching file: ${file}`);

// 🧪 Spawn ts-node-dev process
spawn(
  path.join("node_modules", ".bin", "ts-node-dev"),
  [
    "--respawn",
    "--transpile-only",
    "--watch",
    ".", // Watch all project files
    "--ignore",
    "node_modules",
    fullPath,
  ],
  {
    stdio: "inherit",
    shell: true,
  }
);
```

---

## 🗂️ Nested ফোল্ডারে থাকা ফাইল রান করা

### 📁 উদাহরণ ডিরেক্টরি স্ট্রাকচার:

```
project/
├── src/
│   ├── index.ts
│   └── utils/
│       └── helper.ts
```

### 🚀 রান করার নিয়ম:

```bash
npm run watch -- src/utils/helper.ts
```

---

## 🏱️ বাড়তি সুবিধা: ফাইল লিস্ট দেখানো ⚡️

আপনি যদি কোনো ফাইলের পাথ না দিন, তাহলে এই CLI টুলটি সব .ts ফাইলর তালিকা দেখাবে এবং OS অনুজায়ী রান কমান্ড সরিয়াল করবে।

---

## ছবি (Screenshot)

![Screenshot of CLI Tool](./assets/example.png?text=Screenshot+of+CLI+Tool)

## 🌟 উপসংহার

এই প্রক্রিয়াটি ব্যবহার করে আপনি TypeScript ফাইলগুলো ডায়নামিক ভাবে চালাতে পারবেন `ts-node-dev` দিয়ে — কোন ফাইল রান করবেন তাও দেখাবে, এবং প্ল্যাটফর্ম অনুজায়ী পাথে path ফর্মেট সাজেস্ট করবে! 💻⚡️

**Happy Coding! 🚀**
