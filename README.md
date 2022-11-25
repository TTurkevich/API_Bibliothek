# **_API library_**

## **Учебный проект**

- Автор: Татьяна Туркевич.

Для запуска проекта должен быть установлен Docker.
Установите Docker (https://www.docker.com/products/docker-desktop/):

Windows — Docker Desktop for Windows.
MacOS — Docker Desktop for Mac.
Linux — в зависимости от версии: CentOS, Debian, Fedora, Raspbian, Ubuntu.

Запустите Docker Desktop.

Откройте терминал (macOS и Linux) или Git Bash (Windows) и введите команду:

`docker run -d -p 127.0.0.1:27017:27017 —name library mongo`

Склонируйте репозиторий и установите зависимости(dependencies, devDependencies)

`$ git clone https://github.com/TTurkevich/API_Bibliothek`

`npm install`

Создайте файл .env ( пример всех переменных окружения находится в файле `env.example`)

Для запуска в development режиме выполните команду
npm run dev

Сервер будет доступен по адресу `http://127.0.0.1:<PORT>`

---
