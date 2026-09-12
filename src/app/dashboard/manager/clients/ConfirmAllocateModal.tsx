"use client";

import AllocationPreviewPanel, {
  type AllocationPreview,
} from "./AllocationPreviewPanel";

type Props = {
  preview: AllocationPreview;
  allocating: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmAllocateModal({
  preview,
  allocating,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Confirm allocation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Review the allocation details before committing client capital.
        </p>
        <AllocationPreviewPanel preview={preview} loading={false} />
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={allocating}
            className="flex-1 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg font-semibold"
          >
            {allocating ? "Allocating…" : "Confirm allocation"}
          </button>
        </div>
      </div>
    </div>
  );
}
