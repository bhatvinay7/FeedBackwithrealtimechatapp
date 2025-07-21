"""drop index  ix_IndividualMessage_id

Revision ID: fc5421656b29
Revises: d55897d4045d
Create Date: 2025-07-18 13:35:44.754545

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fc5421656b29'
down_revision: Union[str, Sequence[str], None] = 'd55897d4045d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
