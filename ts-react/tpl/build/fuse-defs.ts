import { NewSpec } from './fuselib';

const spec = NewSpec();

spec.AddPaged('confucius_paged', 'confucius/paged');

spec.AddSPA('saas/app/entrance');

spec.Run();
