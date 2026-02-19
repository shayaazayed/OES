# Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# نسخ ملفات المشروع
COPY Backend/*.csproj ./Backend/
RUN dotnet restore Backend/ExamSystem.csproj

COPY Backend/. ./Backend/
WORKDIR /app/Backend
RUN dotnet publish ExamSystem.csproj -c Release -o out

# مرحلة التشغيل
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/Backend/out ./
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_HOST_PATH=/usr/share/dotnet/dotnet
ENTRYPOINT ["dotnet", "ExamSystem.dll"]