import { AboutDialog, AboutDialogProps } from '@theia/core/lib/browser/about-dialog';

import { AboutTuringDialog } from './about-dialog';
import { ContainerModule } from 'inversify';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
  bind(AboutTuringDialog).toSelf().inSingletonScope();

  // 通过我们的自定义控件重新绑定 theia 的 AboutDialog
  rebind(AboutDialog).to(AboutTuringDialog).inSingletonScope();
  rebind(AboutDialogProps).toConstantValue({ title: 'Turing IDE' });
});
