FROM node:14-alpine

# ตั้งค่า working directory ใหม่ใน Docker container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json ลงใน Docker container
COPY package*.json ./

# ติดตั้ง dependencies ด้วย npm
RUN npm install

# คัดลอกไฟล์ทั้งหมดจากโปรเจคของเราลงใน Docker container
COPY . .

# expose พอร์ต 3000 ที่ใช้ในการรัน Next.js
EXPOSE 3000

# สั่งให้รันเมื่อเปิด container
CMD [ "npm", "run", "dev" ]