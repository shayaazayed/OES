#!/bin/bash

# Install .NET dependencies
dotnet restore Backend/ExamSystem.csproj

# Build the project
dotnet build Backend/ExamSystem.csproj --configuration Release

# Run the application
dotnet run --project Backend/ExamSystem.csproj --configuration Release --urls "http://0.0.0.0:$PORT"
