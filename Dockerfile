# Docker Multi Stage Build
FROM node:20.9.0-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY ./package.json /app
COPY ./package-lock.json /app

# 종속성 설치
RUN npm install

# NestJS CLI 전역 설치
RUN npm i -g @nestjs/cli

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 도커 컴포즈를 사용하지않고 도커파일로만 MySQL을 설치할 경우 
# 기존 mysql 이미지가 아닌 새 이미지를 생성해서 빌드하고 싶을 때 사용
# FROM mysql:latest

# # 환경 변수 설정
# ENV MYSQL_DATABASE=${DB_DATABASE_NAME}
# ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
# ENV MYSQL_USER=${DB_USER}
# ENV MYSQL_PASSWORD=${DB_PASSWORD}

# 초기 SQL 스크립트를 복사하여 실행
#COPY init.sql /docker-entrypoint-initdb.d/

FROM node:20.9.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Builder 스테이지에서 빌드된 dist 및 gitignore, node_modules 복사
COPY .gitignore .gitignore
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

ENTRYPOINT ["/docker-entrypoint.sh"]