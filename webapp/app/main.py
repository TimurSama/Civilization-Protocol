from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routes import users, admin
import os

app = FastAPI(title="VOD.eco MVP")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение маршрутов
app.include_router(users.router, prefix="/api")
app.include_router(admin.router, prefix="/admin")

# Статические файлы
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    return FileResponse(os.path.join(static_dir, "index.html"))

@app.get("/tokenomics")
async def tokenomics():
    return FileResponse(os.path.join(static_dir, "tokenomics.html"))

@app.get("/roadmap")
async def roadmap():
    return FileResponse(os.path.join(static_dir, "roadmap.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 