from app.repositories.project_repository import ProjectRepository

repository = ProjectRepository()


async def create_project(
    user_id: int,
    project
):

    return await repository.create_project(
        user_id=user_id,
        name=project.name
    )


async def get_projects(
    user_id: int
):

    return await repository.get_projects(
        user_id
    )


async def rename_project(
    project_id: int,
    name: str
):

    return await repository.rename_project(
        project_id,
        name
    )


async def delete_project(
    project_id: int
):

    return await repository.delete_project(
        project_id
    )