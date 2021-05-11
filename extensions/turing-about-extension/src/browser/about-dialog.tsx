import * as React from 'react';
import {
  AboutDialog,
  AboutDialogProps,
  ABOUT_CONTENT_CLASS,
} from '@theia/core/lib/browser/about-dialog';
import { injectable, inject, postConstruct } from 'inversify';
import { ThemeService, Theme } from '@theia/core/lib/browser/theming';
import * as darkLogo from '../../src/browser/style/logo-dark.svg';
import * as lightLogo from '../../src/browser/style/logo-light.svg';
import '../../src/browser/style/about.css';

export const ABOUT_HEADER_CLASS = 'about-header';
export const ABOUT_LOGO_CLASS = 'about-logo';
export const ABOUT_DESCRIPTION_CLASS = 'about-description';

@injectable()
export class AboutTuringDialog extends AboutDialog {
  @inject(ThemeService)
  protected readonly themeService: ThemeService;

  constructor(@inject(AboutDialogProps) protected readonly props: AboutDialogProps) {
    super(props);
  }

  @postConstruct()
  protected async init(): Promise<void> {
    this.extensionsInfos = await this.appServer.getExtensionsInfos();
    this.update();
  }

  protected render(): React.ReactNode {
    return (
      <div className={ABOUT_CONTENT_CLASS}>
        {this.renderHeader()}
        {this.renderExtensions()}
      </div>
    );
  }

  protected renderHeader(): React.ReactNode {
    return (
      <div className={ABOUT_HEADER_CLASS}>
        {this.getLogo()}
        {this.getDescription()}
      </div>
    );
  }

  protected getLogo(): React.ReactNode {
    let src = this.isDark(this.themeService.getCurrentTheme()) ? darkLogo : lightLogo;

    this.themeService.onThemeChange((e) => {
      src = this.isDark(e.newTheme) ? darkLogo : lightLogo;
    });

    return (
      <div className={ABOUT_LOGO_CLASS}>
        <img src={src} alt="turing logo" />
      </div>
    );
  }

  private isDark(theme: Theme): boolean {
    return !theme.id.includes('light');
  }

  protected getDescription(): React.ReactNode {
    return (
      <h4 className={ABOUT_DESCRIPTION_CLASS}>
        2021 &copy;&nbsp;
        <a href="https://github.com/kenve" target="_blank" rel="noopener noreferrer">
          github.com/kenve
        </a>
      </h4>
    );
  }
}
