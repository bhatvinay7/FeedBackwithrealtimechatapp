"""drop index ix_IndividualMessage_id

Revision ID: ddaf9c35ec04
Revises: 41fee07a10ff
Create Date: 2025-07-18 13:34:25.498838

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ddaf9c35ec04'
down_revision: Union[str, Sequence[str], None] = '41fee07a10ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
