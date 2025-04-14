from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # à sécuriser plus tard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"message": "API opérationnelle 🚀"}
@app.post("/auth/register")
def register_user(data: dict):
    return {"status": "user registered (mock)"}

@app.post("/auth/login")
def login_user(data: dict):
    return {"status": "user logged in (mock)"}