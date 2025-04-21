# <img src="assets\images\logo-o-m.png" width="40px"> Momentum – Smart Task Reminder App 

**Momentum is a task management app that goes beyond traditional to-do lists. Unlike standard apps where tasks get forgotten after the deadline, Momentum ensures you stay on track with AI-generated reminders inspired by Duolingo’s notification system.**

### Challenges solved:  

I tried to solve a problem that arise with traditional task manager tools (todo apps) like notion, where you  do note them down but the software doesn't remind of those task and then they become irrelevant after the deadline is crossed. My app sends you remainders like duolingo to let you complete what to task is, I use AI to generate the messages (notification).


## Technologies Used: 
<p>
<img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37">
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"/>
</p>

## 🚀 Features
- ✅ AI-Powered Reminders – Personalized notifications to keep tasks relevant using **FCM v1 push notification service**
- ✅ React Native Expo – Cross-platform mobile app development with **Expo and EAS services**
- ✅ Supabase Backend – Secure user authentication & task management 
- ✅ Redux Toolkit – Efficient state management for a smooth experience
- ✅ Offline Support – Access tasks anytime

# Screenshots

<style>
  img {
    border-radius:20px; 
    box-shadow:0 0 0 3px black, 0 0 0 4px white, 0 0 12px 2px black; margin:10px;
  }
</style>
<p>
  <img src="https://media-hosting.imagekit.io/3dacca7d68c8479b/Screenshot%202025-04-21%20231847.png?Expires=1839865876&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=IbRynlAcQCZ3gcnqWi~EYBdBjVwqlOrCAiZjni~YEeMXZV~6FOYyU~fhWGrpRddt0dItC4EISyJlY4g899sQQU1zQfhL95I6mJnfZ63uofslYUkrDQTbTKQVoEzIAuPboPtDwcwbXx68m1kDUFrBpBilcQUOz8qEnUtXijCEl~mU0L2nIXAizUnyfxjRAsXzgOiIOPuCUALXn~5N-vVjBnX5RK-rRG4ReJ~~RvXT7LNI-IRvI81AcOXTTQQ2rdHmkDUXKMmhW3xkD0pllQhJLbbZ7wvrmFUUk5-xK19mrmQswzTTYgN2LMIC7up1x8uxC-IRSiW02q4KdtBxnCjIbw__" width='200' alt="Starting Screen"/>
  <img src="https://media-hosting.imagekit.io/dfd1f1f08a8f4559/Screenshot%202025-04-21%20231913.png?Expires=1839865876&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=nfdRQ3sT-hkY~H2UBkTiMBMpIPs3LmuVRKAva7mV3TEbcWrlAECs5QPj0AkilTl5vLSPu897ULdciQ0m6QRifceIGzv7eiCWTIhChB1oDyX85INbPsMTbrwS00enSf8OZbT4ZrXZdZt0NOj6Hr2Xof4f5LRhc49oUQnju25PyuxtmXybD6eYzHZo4H5cld8r2089MFKatPCB0jvIz2o3QLvUiZbqZjyvykrjRUSmo6s200GnCVWyoH-KUl~iscC9VH9jOqc0B1vtenIXzUv3wE-Ma5Pjqxx7LSzoH6ewWDZaWGS2spCgDwi4n65pdEl5-vaQA4u8w9Bb5GC7FxPTwg__" width='200' alt="Login Screen"/>
  <img src="https://media-hosting.imagekit.io/8fa08ab8586245c5/Screenshot%202025-04-21%20232041.png?Expires=1839865876&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=nLm1uP396j27pPmgJVqse6747acZkhS6KeRC-h5cs4HcYoEPEroy9ei91UFUINIhC3zBR9nXewrESFr54hyz3qZ5leWcpsWGlcuREAosVj6m6DwZ8fywqNMlllUPDJ8DO~dTntS4C1Q70ch40QQUVzWXKGnVkX4z5fSEMwiOdKeZJcir9-S2qJgagl0G65FSxlDWYNzmLtt95nC1Nqf6o2pntBIwTY5LfkvbBQmyar1zFdO5vGEGkGG42JF91f5ThhiMUqb4lBDCsg6s8FzrJR1dpeIZqyQvzvHCs-2QAoJ0hrEEk0cqkrpvcgvXLDquX9ktNu0bs-OAuNshVy7Mhg__" width='200' alt="Task Completed" />
  <img src="https://media-hosting.imagekit.io/328cd46d7ac14112/WhatsApp%20Image%202025-04-02%20at%2011.33.15%20PM.jpeg?Expires=1839865572&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=mXD6jgOusxW3jsqQd0GQ8AY3o7kPzBMFyy37aTnqK7JYN943rl6yt0Xwgmo4LJoqYo-fU1zcsOL~tLtGmQtOnQaoo3gYIlZTEyoCw0DGVW-yh6ueWdLgFtU3-yyUIGQTdV5YdBf1R5w2NK5rtrEuFEizXKNhDhwESTo1FwFxhFeMOVf53jIRu7D9QdWDRo74-iRshH6n6rGONQvTVBTIerOdBH8esSGQaQUULBLuxsRSHohA6DdFFJjjVISozSVP-jG8bE4qF1ex1DySYI8~qhnzJActxPRv0Kat0~LVQBhQ4eUMsiiD~vNEUjf6ZNDWttRHzr8LyT5XhGPzz1gBJg__" width="200" alt="Task Manager section" />
  <img src="https://media-hosting.imagekit.io/9d86646b827e418d/Screenshot_20250421_223834_Momentum.jpg?Expires=1839865105&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RIGoSOZ0QmsCaiiJRZmzUVMORCC-ZQTBMTIl8nnTfPvoxP74RSXqc0IlqWt4dFrqTEJlchjqGsS3QoEzmVAHUuKmTASxoY0dkd53wRif7yLBu3qaLh5RUaCLjdcLGsepi~FToyUvnjRIUr5HYSmq3GsZI1vX5sxW5Vdz-9Sgwhje25e2NZMOiJ09orgiOpPCJc1wZh6B58lyKakaARsu665canAVrrcUzk-Ou0gnUn4KvHui40O9OZkLdZKq-aG-XC1PDksCYmdKNoLvO2Me6zPZL9GVsL4IXgEOw3KWpz2FAR4maLz15gVNbwRmSKxKKLTEXDB3I9MdOzB3WNDydQ__" width="200" alt="Profile Section" />

  ## A sample of the Push Notifications

  <img src="https://media-hosting.imagekit.io/f243b03e6ef64c48/Screenshot%202025-04-21%20232105.png?Expires=1839865876&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ztkbm7xCUWblTyoH7sRt~bMwU5TBo~KZ-Ufn2gr8mimP-y3QvgqEYIaB9mHKhTd6A7E2WFQVd6Lrr2t48YC9vZLxUb1LRtWvzPPPQTfUeUXFIR9sDiF5SwawT~QSNKb7A0Wcq12v0HSA0zpnBdPliQi-IziGk8RaVkbVnrpvUo73sNfhHPv-Imja4o03BlrVOSiqqltyNFqgUNAlFqESM9fVk4~183935x7rfrBdsLymMyRsAhTyNREfPmtp0kV0U76zO9Y9-drGMcCNdWFH0ToOKR1DjetLw8T0CQ-66VZnjjJi~FLZxpykHAJXc~JenpOH-VPlATgFHBRzs5eNnw__" width="200" style="border-radius:20px; box-shadow:0 0 0 3px black, 0 0 0 4px white, 0 0 12px 2px black; margin:10;"/>
</p>

## Steps for Installation
```sh
git clone https://github.com/vishnuprasad2004/momentum.git  
cd momentum  
npx expo install  
npx expo start  
```