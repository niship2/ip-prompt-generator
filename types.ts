
export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea';
  placeholder: string;
  required: boolean;
  rows?: number;
}

export interface TaskOption {
  id: string;
  label: string;
  inputs: InputField[];
  promptTemplate: (data: Record<string, string>) => string;
}

export interface TaskCategory {
  id: string;
  label: string;
  tasks: TaskOption[];
}

export interface ReferencePrompt {
  category: string;
  task: string;
  prompt: string;
  type: string;
  source: {
    text: string;
    url?: string;
  };
}
