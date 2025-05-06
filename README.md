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
  console.error("❌ ফাইলের নাম দিন! যেমন: npm run watch -- 3.1.ts");
  process.exit(1);
}

const fullPath = path.join("src", file);

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
    shell: true, // Windows এ .cmd ফাইল রান করার জন্য প্রযোজ্য
  }
);
```

➡️ এটি স্বয়ংক্রিয়ভাবে src/3.1.ts ফাইলটি রান করবে এবং পরিবর্তন দেখলেই রিলোড করবে।

## 💡 বাড়তি সুবিধা
আপনি চাইলে watch-entry.js স্ক্রিপ্টটি এমনভাবে বাড়াতে পারেন যেন এটি .ts ফাইলের তালিকা দেখায় যদি কিছু না দেওয়া হয়।

এটি একটি কাস্টম CLI টুল হিসেবেও ব্যবহারযোগ্য!

## 🎯 উপসংহার
এই প্রক্রিয়াটি ব্যবহার করে আপনি প্রতিবার ফাইলের নাম package.json-এ পরিবর্তন না করে ডাইনামিকভাবে যে কোনো .ts ফাইল রান করতে পারবেন খুব সহজে ও পেশাদারভাবে। 🧩

Happy coding! 🚀