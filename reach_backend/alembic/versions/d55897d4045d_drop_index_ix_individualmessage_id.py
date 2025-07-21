"""drop index ix_IndividualMessage_id

Revision ID: d55897d4045d
Revises: ddaf9c35ec04
Create Date: 2025-07-18 13:35:08.264397

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd55897d4045d'
down_revision: Union[str, Sequence[str], None] = 'ddaf9c35ec04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
