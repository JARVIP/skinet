# packages

1. .NET 5 https://dotnet.microsoft.com/download/dotnet/5.0

2. Node.js https://nodejs.org/en/

3. Angular CLI https://cli.angular.io/

4. dotnet ef https://www.nuget.org/packages/dotnet-ef/ (command: dotnet tool install --global dotnet-ef --version 5.0.5)

5. docker desktop https://www.docker.com/products/docker-desktop

# install project

1. git clone https://github.com/JARVIP/skinet.git

2. cd skinet

3. docker-compose up --detach

4. dotnet restore

5. cd API

6. dotnet ef database update -c StoreContext

7. dotnet ef database update -c AppIdentityDbContext

8. dotnet run (in this step web API project should be started successfully)

9. cd ../client

10. npm install

11 ng serve (in this step client app should be started successfully)

