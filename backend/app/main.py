from fastapi import FastAPI

from app.api.file import router as file_router

from app.core.config import settings
from app.core.cors import setup_cors
from app.core.exceptions import global_exception_handler
from app.core.logger import logger

from app.api.health import router as health_router
from app.api.chat import router as chat_router
from app.database.init_db import init_db
from app.api import memory
from app.api import project
from app.api.conversation import router as conversation_router
import app.database.conversation

from app.api import message
from app.api.auth_router import router as auth_router
from app.routers.password_router import router as password_router

app = FastAPI(

    title=settings.APP_NAME,

    version="1.0.0"

)


setup_cors(app)

app.add_exception_handler(

    Exception,

    global_exception_handler

)


app.include_router(

    health_router,

    prefix="/api/v1"

)

app.include_router(

    chat_router,

    prefix="/api/v1"

)

app.include_router(

    memory.router,

    prefix="/api/v1",

    tags=["Memory"]

)

app.include_router(

    file_router,

    prefix="/api/v1",

    tags=["Files"]

)

app.include_router(
    project.router,a
    prefix="/api/v1",
    tags=["Projects"]
)

app.include_router(
    conversation_router,
    prefix="/api/v1"
)

app.include_router(

    auth_router,

    prefix="/api/v1",

    tags=["Authentication"]

)
app.include_router(
    message.router,
    prefix="/api/v1"
)
app.include_router(
    password_router,
    prefix="/api/v1",
    tags=["Password"]
)


@app.on_event("startup")
async def startup():

    await init_db()

    logger.info("Cortex Backend Started")


@app.get("/")
async def root():

    return {

        "message": "Welcome to Cortex AI Backend"

    }

