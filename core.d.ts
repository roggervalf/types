declare module '@qualweb/core' {
  import { Node } from 'domhandler';
  import { Stylesheet } from 'css';
  import { WappalyzerReport, WappalyzerOptions } from '@qualweb/wappalyzer';
  import { ACTRulesReport, ACTROptions } from '@qualweb/act-rules';
  import { CSSTechniquesReport, CSSTOptions } from '@qualweb/css-techniques';
  import { HTMLTechniquesReport, HTMLTOptions } from '@qualweb/html-techniques';
  import { BestPracticesReport, BPOptions } from '@qualweb/best-practices';
  import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';
  import { LaunchOptions } from 'puppeteer';

  interface QualwebOptions {
    url?: string;
    urls?: string[];
    file?: string;
    crawl?: string;
    html?: string;
    viewport?: PageOptions;
    maxParallelEvaluations?: number;
    force?: boolean;
    execute?: {
      wappalyzer?: boolean;
      act?: boolean;
      html?: boolean;
      css?: boolean;
      bp?: boolean;
    };
    'wappalyzer'?: WappalyzerOptions;
    'act-rules'?: ACTROptions;
    'html-techniques'?: HTMLTOptions;
    'css-techniques'?: CSSTOptions; 
  }

  interface Evaluator {
    name: string;
    description: string;
    version: string;
    homepage: string;
    date: string;
    hash: string;
    url: Url;
    page: {
      viewport: {
        mobile: boolean;
        landscape: boolean;
        userAgent: string;
        resolution: {
          width: number;
          height: number;
        };
      };
      dom: DomData;
    };
  }

  interface Url {
    inputUrl: string;
    protocol: string;
    domainName: string;
    domain: string;
    uri: string;
    completeUrl: string;
  }

  interface Metadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface Modules {
    'wappalyzer'?: WappalyzerReport;
    'act-rules'?: ACTRulesReport;
    'html-techniques'?: HTMLTechniquesReport;
    'css-techniques'?: CSSTechniquesReport;
    'best-practices'?: BestPracticesReport;
  }

  interface EvaluationReport {
    type: 'evaluation';
    system: Evaluator;
    metadata: Metadata;
    modules: Modules;
  }

  interface PageOptions {
    mobile?: boolean;
    landscape?: boolean;
    userAgent?: string;
    resolution?: {
      width?: number;
      height?: number;
    };
  }

  interface SourceHtml {
    html: {
      plain: string;
      parsed: Node[];
    };
    title?: string;
    elementCount?: number;
  }

  interface ProcessedHtml {
    html: {
      plain: string;
    };
    title?: string;
    elementCount?: number;
  }

  interface CSSStylesheet {
    file: string;
    content?: {
      plain?: string;
      parsed?: Stylesheet;
    };
  }

  interface DomData {
    source: SourceHtml;
    processed: ProcessedHtml;
    stylesheets: CSSStylesheet[];
  }

  type Module = 'wappalyzer' | 'act-rules' | 'html-techniques' | 'css-techniques' | 'best-practices';

  function start(options?: LaunchOptions): Promise<void>;
  function close(): Promise<void>;
  function evaluate(options: QualwebOptions): Promise<{[url: string]: EvaluationReport}>;
  function generateEarlReport(options?: EarlOptions): Promise<{[url: string]: EarlReport}>;

  export {
    QualwebOptions,
    EvaluationReport,
    Evaluator,
    Url,
    Metadata,
    Modules,
    Module,
    PageOptions,
    SourceHtml,
    ProcessedHtml,
    DomData,
    CSSStylesheet,
    start,
    close,
    evaluate,
    generateEarlReport
  };
}