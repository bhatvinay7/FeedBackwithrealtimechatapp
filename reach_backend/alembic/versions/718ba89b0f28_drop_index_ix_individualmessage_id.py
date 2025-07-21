"""drop index  ix_IndividualMessage_id

Revision ID: 718ba89b0f28
Revises: fc5421656b29
Create Date: 2025-07-18 13:37:17.841162

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '718ba89b0f28'
down_revision: Union[str, Sequence[str], None] = 'fc5421656b29'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
