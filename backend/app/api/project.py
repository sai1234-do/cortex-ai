from fastapi import APIRouter, Depends

from app.core.auth import get_current_user

from app.models.project_models import (
    ProjectCreate,
    ProjectResponse,
)

from app.services.project_service import (
    create_project,
    get_projects,
    rename_project,
    delete_project,
)

router = APIRouter()


@router.post(
    "/projects",
    response_model=ProjectResponse
)
async def add_project(

    project: ProjectCreate,

    current_user=Depends(get_current_user)

):

    return await create_project(
        current_user.id,
        project
    )


@router.get(
    "/projects",
    response_model=list[ProjectResponse]
)
async def read_projects(

    current_user=Depends(get_current_user)

):

    return await get_projects(
        current_user.id
    )


@router.put(
    "/projects/{project_id}",
    response_model=ProjectResponse
)
async def update_project(

    project_id: int,

    project: ProjectCreate,

    current_user=Depends(get_current_user)

):

    return await rename_project(
        project_id,
        project.name
    )


@router.delete(
    "/projects/{project_id}"
)
async def remove_project(

    project_id: int,

    current_user=Depends(get_current_user)

):

    deleted = await delete_project(
        project_id
    )

    return {
        "success": deleted
    }