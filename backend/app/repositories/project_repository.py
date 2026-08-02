from sqlalchemy import select

from app.database.database import AsyncSessionLocal
from app.database.project import Project


class ProjectRepository:

    async def create_project(
        self,
        user_id: int,
        name: str
    ):

        async with AsyncSessionLocal() as session:

            project = Project(

                user_id=user_id,

                name=name
                

            )

            session.add(project)

            await session.commit()

            await session.refresh(project)

            return project

    async def get_projects(
        self,
        user_id: int
    ):

        async with AsyncSessionLocal() as session:

            result = await session.execute(

                select(Project).where(

                    Project.user_id == user_id

                )

            )

            return result.scalars().all()

    async def rename_project(
       self,
       project_id: int,
       name: str
   ):

      async with AsyncSessionLocal() as session:

        project = await session.get(
            Project,
            project_id
        )

        if project is None:
            return None

        project.name = name

        await session.commit()
        await session.refresh(project)

        return project
      

    async def delete_project(
      self,
      project_id: int
    ):

     async with AsyncSessionLocal() as session:

        project = await session.get(
            Project,
            project_id
        )

        if project is None:
            return False

        await session.delete(project)

        await session.commit()

        return True

