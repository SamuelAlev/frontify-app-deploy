import { defineBlock } from '@frontify/guideline-blocks-settings';

import { DummyBlock } from './DummyBlock';
import { settings } from './settings';

export default defineBlock({
    block: DummyBlock,
    settings,
});
