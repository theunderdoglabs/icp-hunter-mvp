import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, List, Plus, Check } from 'lucide-react';
import { CustomList } from '../../types';

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  lists: CustomList[];
  selectedProfiles: string[];
  onAddToList: (listId: string, profileIds: string[]) => void;
  onCreateNewList: () => void;
}

const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  lists,
  selectedProfiles,
  onAddToList,
  onCreateNewList,
}) => {
  const [selectedList, setSelectedList] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedList) return;

    onAddToList(selectedList, selectedProfiles);
    setSelectedList('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold flex items-center">
                  <List size={24} className="text-primary mr-2" />
                  Add to List
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Add {selectedProfiles.length} selected profile{selectedProfiles.length !== 1 ? 's' : ''} to:
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-2 mb-4">
                    {lists.map((list) => (
                      <label
                        key={list.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedList === list.id
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-light hover:bg-primary/5 border-2 border-transparent'
                        }`}
                      >
                        <input
                          type="radio"
                          name="list"
                          value={list.id}
                          checked={selectedList === list.id}
                          onChange={(e) => setSelectedList(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-grow">
                          <div className="font-medium">{list.name}</div>
                          {list.description && (
                            <div className="text-sm text-gray-600">
                              {list.description}
                            </div>
                          )}
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedList === list.id
                            ? 'bg-primary text-white'
                            : 'bg-gray-200'
                        }`}>
                          <Check size={16} />
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onCreateNewList}
                    className="w-full btn btn-secondary flex items-center justify-center mb-4"
                  >
                    <Plus size={20} className="mr-2" />
                    Create New List
                  </button>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!selectedList}
                    >
                      Add to List
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddToListModal;