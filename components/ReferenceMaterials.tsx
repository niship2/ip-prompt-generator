import React from 'react';
import { REFERENCE_MATERIALS } from '../referenceMaterials';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

const ReferenceMaterials: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12" aria-labelledby="materials-heading">
        <h2 id="materials-heading" className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">参考資料</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {REFERENCE_MATERIALS.map((material, index) => (
              <li key={index} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <a 
                  href={material.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <p className="font-semibold group-hover:underline flex items-center">
                    {material.title}
                    <ExternalLinkIcon className="h-4 w-4 ml-2 opacity-60 group-hover:opacity-100" />
                  </p>
                  <p className="text-sm text-slate-500 mt-1 break-all">{material.url}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReferenceMaterials;
