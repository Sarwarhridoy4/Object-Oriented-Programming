# 🚀 TypeScript ফাইল ডাইনামিকভাবে রান করুন `ts-node-dev` দিয়ে

এই ডকুমেন্টেশনটি আপনাকে দেখাবে কিভাবে শুধুমাত্র একটি ফাইলের নাম দিয়ে আপনি TypeScript কোড রান করতে পারেন — বারবার স্ক্রিপ্ট বদলানোর দরকার নেই! 🧠

---

## ✅ ধাপ ১: প্রজেক্ট সেটআপ করুন

প্রথমে আপনার Node.js প্রজেক্টে `ts-node-dev` ইনস্টল করুন:

```bash
npm install --save-dev ts-node-dev
```

## ✅ ধাপ ২: স্ক্রিপ্ট যুক্ত করুন

আপনার package.json ফাইলে নিচের মতো একটি স্ক্রিপ্ট যুক্ত করুন:

```json
"scripts": {
  "watch": "node watch-entry.js"
}

```

## ধাপ ৩: watch-entry.js ফাইল তৈরি করুন

প্রজেক্টের রুট ডিরেক্টরিতে একটি নতুন ফাইল তৈরি করুন: watch-entry.js
এবং নিচের কোডটি কপি-পেস্ট করুন:

```js
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const file = process.argv[2];

if (!file) {
  console.log("📂 src ফোল্ডারে পাওয়া গেছে নিচের TypeScript ফাইলগুলো:\n");

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
  console.log("\n❗ উদাহরণ রান করার জন্য: npm run watch -- utils/helper.ts");
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
```

➡️ এটি স্বয়ংক্রিয়ভাবে src/<your_file_name>.ts ফাইলটি রান করবে এবং পরিবর্তন দেখলেই রিলোড করবে।

## 🗂️ Nested ফোল্ডারে থাকা ফাইল রান করা

আপনি যদি `src` ডিরেক্টরির ভিতরে কোনো সাব-ফোল্ডারে `.ts` ফাইল রাখেন, তাও আপনি সহজেই তা রান করতে পারবেন।

### 📁 উদাহরণ ডিরেক্টরি স্ট্রাকচার:

```code
src/
├── utils/
│ └── helper.ts
```

### 🚀 রান করার নিয়ম:

```bash
npm run watch -- utils/helper.ts
```

এটি স্বয়ংক্রিয়ভাবে src/utils/helper.ts ফাইলটি রান করবে এবং ফাইলটি পরিবর্তন হলেই আবার রান হবে।

🧠 মনে রাখবেন: আপনি src/-এর পর থেকে ফাইল পাথ দিবেন (e.g. utils/helper.ts)।

🛡️ Windows এবং Linux দুটিতেই কাজ করার জন্য path normalize:
watch-entry.js-এ নিচের লাইনে path.normalize() ব্যবহার করলে ক্রস-প্ল্যাটফর্ম সাপোর্ট আরও ভালো হয়:

```bash
const fullPath = path.normalize(path.join("src", file));
```

এভাবে আপনি আপনার সব .ts ফাইল সাবফোল্ডারসহ দ্রুত ও সহজে রান করতে পারবেন — সম্পূর্ণ অটোমেটেডভাবে! 💻⚡

## 🎁 বাড়তি সুবিধা: ফাইল লিস্ট দেখানো 🎯

আপনি যদি কোনো `.ts` ফাইলের নাম না দেন, তাহলে এই টুলটি স্বয়ংক্রিয়ভাবে `src/` ফোল্ডারের সব `.ts` ফাইল লিস্ট আকারে দেখাবে। এতে আপনি সহজেই কোন ফাইল রান করবেন তা নির্বাচন করতে পারবেন।

### 🧪 কিভাবে কাজ করে

```bash
npm run watch
```

এটি একটি কাস্টম CLI টুল হিসেবেও ব্যবহারযোগ্য!

## 🎯 উপসংহার

এই প্রক্রিয়াটি ব্যবহার করে আপনি প্রতিবার ফাইলের নাম package.json-এ পরিবর্তন না করে ডাইনামিকভাবে যে কোনো .ts ফাইল রান করতে পারবেন খুব সহজে ও পেশাদারভাবে। 🧩

Happy coding! 🚀
```
