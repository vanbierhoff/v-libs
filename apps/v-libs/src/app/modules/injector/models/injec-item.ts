import { getGlobalInjector, InjectDepsDecorator } from '@v/cdk';
import { ThemeManagerService } from '@v/themes';

@InjectDepsDecorator()
export class InjectTest {
  constructor(public  readonly theme: ThemeManagerService) {
    console.log('gewe asdasdasdasd asdasdasdasdasd', getGlobalInjector())
  }
}
