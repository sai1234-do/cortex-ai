from fastapi import APIRouter, Depends

from app.core.auth import get_current_user

from app.models.memory_models import (
    MemoryCreate,
    MemoryResponse
)

from app.services.memory_service import (
    create_memory,
    get_memories
)

router = APIRouter()


@router.post(
    "/memory",
    response_model=MemoryResponse
)
async def add_memory(

    memory: MemoryCreate,

    current_user=Depends(get_current_user)

):

    return await create_memory(

        current_user.id,

        memory

    )


@router.get(
    "/memory",
    response_model=list[MemoryResponse]
)
async def read_memories(

    current_user=Depends(get_current_user)

):

    return await get_memories(

        current_user.id

    )