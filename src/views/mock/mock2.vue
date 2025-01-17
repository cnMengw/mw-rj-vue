<template>
    <div class="min-h-screen bg-gray-50">
        <template>
  <div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-2">Tailwind Test</h1>
    <p class="text-sm">If you can see this text in white on a blue background, Tailwind is working!</p>
  </div>
</template>


      <!-- Header Card -->
      <div class="bg-[#F76707] p-6 rounded-b-3xl text-white mb-4">
        <h1 class="text-2xl font-bold mb-4">新高一暑假班（QH）</h1>
        
        <!-- Course Tags -->
        <div class="flex gap-2 mb-4 flex-wrap">
          <span v-for="tag in tags" :key="tag" 
                class="px-4 py-1 rounded-full text-sm"
                :class="getTagColor(tag)">
            {{ tag }}
          </span>
        </div>
  
        <!-- Location -->
        <div class="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>艾瑟顿校区340教室艾瑟顿校区340教室</span>
        </div>
  
        <!-- Teachers -->
        <div class="flex gap-4 mb-4">
          <div v-for="teacher in teachers" :key="teacher.name" 
               class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-gray-200 mb-1"></div>
            <span class="text-sm">{{ teacher.name }}</span>
          </div>
        </div>
  
        <!-- Price -->
        <div class="flex items-center justify-between">
          <div class="text-sm opacity-75">
            <span>高一</span>
            <span class="mx-2">·</span>
            <span>暑假班</span>
          </div>
          <div class="text-2xl font-bold">¥1699</div>
        </div>
      </div>
  
      <!-- Promotions -->
      <div class="bg-white p-6 mb-4">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <div class="w-1 h-6 bg-[#F76707] mr-2"></div>
          优惠
        </h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-bold mb-2">早鸟优惠：</h3>
            <ul class="space-y-2 text-gray-600">
              <li>12.31前支付定金，报入正式班级时享受7.5折</li>
              <li>2.15前支付定金，报入正式班级时享受8.5折</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold mb-2">联报优惠：</h3>
            <ul class="space-y-2 text-gray-600">
              <li>支付定金后，报入正式班级时，四科联报减450</li>
              <li>支付定金后，报入正式班级时，三科联报减300</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Process Timeline -->
      <div class="bg-white p-6 mb-20">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <div class="w-1 h-6 bg-[#F76707] mr-2"></div>
          交易流程
        </h2>
        
        <div class="relative flex justify-between">
          <div v-for="(step, index) in steps" :key="index" 
               class="flex flex-col items-center flex-1">
            <div class="w-8 h-8 rounded-full bg-[#4ade80] text-white flex items-center justify-center mb-2">
              {{ index + 1 }}
            </div>
            <div class="text-center">
              <div class="font-bold mb-1">{{ step.title }}</div>
              <div class="text-sm text-gray-500">{{ step.date }}</div>
              <div class="text-xs text-gray-400">{{ step.description }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom Buttons -->
      <div class="fixed bottom-0 left-0 right-0 bg-white p-4 flex gap-4 shadow-lg">
        <button class="flex items-center justify-center gap-2 p-4 rounded-lg flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span class="text-gray-600">电话咨询</span>
        </button>
        <button class="flex-1 bg-[#F76707] text-white p-4 rounded-lg">
          立即报名
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const tags = ['联报', '数学', '少儿编程', '美术鉴赏', '语文']
  
  const teachers = [
    { name: '安柏' },
    { name: '提那里' },
    { name: '董仲爽' },
    { name: '董仲爽' }
  ]
  
  const steps = [
    {
      title: '购买预售商品',
      date: '01/01 10:00开始',
      description: ''
    },
    {
      title: '补尾款',
      date: '02/01 10:00开始',
      description: '将电话提醒补款'
    },
    {
      title: '报入正式班级',
      date: '04/01 10:00开始',
      description: '将电话提醒报入'
    }
  ]
  
  const getTagColor = (tag) => {
    const colors = {
      '联报': 'bg-white/20',
      '数学': 'bg-pink-100 text-pink-600',
      '少儿编程': 'bg-blue-100 text-blue-600',
      '美术鉴赏': 'bg-purple-100 text-purple-600',
      '语文': 'bg-orange-100 text-orange-600'
    }
    return colors[tag] || 'bg-gray-100 text-gray-600'
  }
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>