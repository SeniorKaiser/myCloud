"""Удаление таблицы FolderRelations

Revision ID: d947d2097358
Revises: 216761ffc9e1
Create Date: 2025-02-09 14:59:01.251074

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "d947d2097358"
down_revision: Union[str, None] = "216761ffc9e1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("folder_relations")
    op.add_column("folders", sa.Column("parent_folder", sa.String(), nullable=True))
    op.create_foreign_key(None, "folders", "folders", ["parent_folder"], ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "folders", type_="foreignkey")
    op.drop_column("folders", "parent_folder")
    op.create_table(
        "folder_relations",
        sa.Column("parent_folder_id", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column("child_folder_id", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column("id", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(
            ["child_folder_id"], ["folders.id"], name="folder_relations_child_folder_id_fkey"
        ),
        sa.ForeignKeyConstraint(
            ["parent_folder_id"], ["folders.id"], name="folder_relations_parent_folder_id_fkey"
        ),
        sa.PrimaryKeyConstraint(
            "parent_folder_id", "child_folder_id", name="folder_relations_pkey"
        ),
        sa.UniqueConstraint("id", name="folder_relations_id_key"),
    )
    # ### end Alembic commands ###
