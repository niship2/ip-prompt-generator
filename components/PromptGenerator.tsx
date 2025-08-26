
import React, { useState, useEffect } from 'react';
import { TASK_CATEGORIES } from '../constants';
import type { TaskCategory, TaskOption } from '../types';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import GeneratedPrompt from './GeneratedPrompt';

const PromptGenerator: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const selectedCategory: TaskCategory | undefined = TASK_CATEGORIES.find(c => c.id === selectedCategoryId);
  const availableTasks: TaskOption[] = selectedCategory ? selectedCategory.tasks : [];
  const selectedTask: TaskOption | undefined = availableTasks.find(t => t.id === selectedTaskId);

  useEffect(() => {
    setSelectedTaskId('');
    setInputValues({});
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedTask) {
      const initialInputValues = selectedTask.inputs.reduce((acc, input) => {
        acc[input.id] = '';
        return acc;
      }, {} as Record<string, string>);
      setInputValues(initialInputValues);
    } else {
      setInputValues({});
    }
  }, [selectedTaskId, selectedTask]);
  
  useEffect(() => {
    if (selectedTask) {
      const prompt = selectedTask.promptTemplate(inputValues);
      setGeneratedPrompt(prompt);
    } else {
      setGeneratedPrompt('');
    }
  }, [inputValues, selectedTask]);

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. 業務を選択</h2>
        <div className="space-y-4">
          <SelectInput
            label="業務カテゴリ"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            options={[
              { value: '', label: 'カテゴリを選択してください' },
              ...TASK_CATEGORIES.map(cat => ({ value: cat.id, label: cat.label }))
            ]}
          />
          {selectedCategory && (
            <SelectInput
              label="具体的な業務"
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              options={[
                { value: '', label: '業務を選択してください' },
                ...availableTasks.map(task => ({ value: task.id, label: task.label }))
              ]}
            />
          )}
        </div>
        
        {selectedTask && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. 情報を入力</h2>
            <div className="space-y-4">
              {selectedTask.inputs.map(input =>
                input.type === 'textarea' ? (
                  <TextAreaInput
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    value={inputValues[input.id] || ''}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    placeholder={input.placeholder}
                    required={input.required}
                    rows={input.rows}
                  />
                ) : (
                  <TextInput
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    value={inputValues[input.id] || ''}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    placeholder={input.placeholder}
                    required={input.required}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. 生成されたプロンプト</h2>
        <GeneratedPrompt prompt={generatedPrompt} />
      </div>
    </div>
  );
};

export default PromptGenerator;
