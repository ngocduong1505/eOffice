export type FlowType = 'vbd' | 'vbden' | 'noi-bo';
export type FlowStatus = 'active' | 'draft' | 'inactive';
export type StepBehavior = 'duyet' | 'y-kien' | 'phan-cong' | 'ky-so' | 'dong-dau' | 'ban-hanh' | 'luu-ho-so';
export type TimeoutAction = 'stop' | 'skip' | 'notify';
export type Role = 'vp' | 'pb' | 'ld' | 'vt' | 'kh';

export interface Step {
  name: string;
  behavior: StepBehavior;
  deadline: number;
  timeout: TimeoutAction;
  roles: Role[];
}

export interface Flow {
  id: number;
  name: string;
  types: FlowType[];
  status: FlowStatus;
  steps: number;
  created: string;
  author: string;
  hasDoc: boolean;
  stepsData?: Step[];
}

export interface FlowFormData {
  name: string;
  types: FlowType[];
  status: FlowStatus;
  description: string;
  steps: Step[];
}