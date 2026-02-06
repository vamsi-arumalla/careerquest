FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ApplicationService/ApplicationService.csproj", "ApplicationService/"]
RUN dotnet restore "ApplicationService/ApplicationService.csproj"
COPY . .
WORKDIR "/src/ApplicationService"
RUN dotnet build "ApplicationService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApplicationService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApplicationService.dll"]
