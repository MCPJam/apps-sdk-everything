"use client";

import { useState } from "react";
import { useWidgetState, useIsChatGptApp } from "../hooks";

interface DemoState extends Record<string, unknown> {
  counter: number;
  favorites: string[];
  formData: {
    name: string;
    email: string;
    notes: string;
  };
  lastUpdated: string;
}

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {description}
      </p>
      {children}
    </div>
  );
}

export default function StatePersistenceDemo() {
  const [state, setState] = useWidgetState<DemoState>({
    counter: 0,
    favorites: [],
    formData: {
      name: "",
      email: "",
      notes: "",
    },
    lastUpdated: new Date().toISOString(),
  });

  const isChatGptApp = useIsChatGptApp();

  const [newFavoriteInput, setNewFavoriteInput] = useState("");

  const incrementCounter = () => {
    setState((prev) => ({
      ...prev!,
      counter: prev!.counter + 1,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const decrementCounter = () => {
    setState((prev) => ({
      ...prev!,
      counter: prev!.counter - 1,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const resetCounter = () => {
    setState((prev) => ({
      ...prev!,
      counter: 0,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const addFavorite = () => {
    if (newFavoriteInput.trim()) {
      setState((prev) => ({
        ...prev!,
        favorites: [...prev!.favorites, newFavoriteInput.trim()],
        lastUpdated: new Date().toISOString(),
      }));
      setNewFavoriteInput("");
    }
  };

  const removeFavorite = (index: number) => {
    setState((prev) => ({
      ...prev!,
      favorites: prev!.favorites.filter((_, i) => i !== index),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const clearAllFavorites = () => {
    setState((prev) => ({
      ...prev!,
      favorites: [],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateFormData = (field: keyof DemoState["formData"], value: string) => {
    setState((prev) => ({
      ...prev!,
      formData: {
        ...prev!.formData,
        [field]: value,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const clearForm = () => {
    setState((prev) => ({
      ...prev!,
      formData: {
        name: "",
        email: "",
        notes: "",
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const resetAllState = () => {
    setState({
      counter: 0,
      favorites: [],
      formData: {
        name: "",
        email: "",
        notes: "",
      },
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Widget State Persistence Demo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Demonstrates how useWidgetState persists data across widget lifecycles
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. State persistence may not work as expected.
            </p>
          </div>
        )}
        {state && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Tip:</strong> Changes you make here persist and are visible to the
              AI model. Try minimizing and restoring this widget to see the state persist!
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Counter Demo */}
        <DemoCard
          title="Counter"
          description="Simple counter to demonstrate state updates"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
              {state?.counter ?? 0}
            </div>
            <div className="flex gap-2">
              <button
                onClick={decrementCounter}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
              >
                − Decrement
              </button>
              <button
                onClick={resetCounter}
                className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md font-medium transition-colors"
              >
                Reset
              </button>
              <button
                onClick={incrementCounter}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors"
              >
                + Increment
              </button>
            </div>
          </div>
        </DemoCard>

        {/* Favorites List Demo */}
        <DemoCard
          title="Favorites List"
          description="Manage a list of favorite items"
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFavoriteInput}
                onChange={(e) => setNewFavoriteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFavorite()}
                placeholder="Add a favorite item..."
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
              <button
                onClick={addFavorite}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              >
                Add
              </button>
            </div>
            {state?.favorites && state.favorites.length > 0 ? (
              <>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {state.favorites.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded"
                    >
                      <span className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        ⭐ {item}
                      </span>
                      <button
                        onClick={() => removeFavorite(index)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={clearAllFavorites}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
                >
                  Clear All
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-4">
                No favorites yet. Add some above!
              </p>
            )}
          </div>
        </DemoCard>

        {/* Form Data Demo */}
        <DemoCard
          title="Form Data"
          description="Persistent form that survives widget restarts"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Name:
              </label>
              <input
                type="text"
                value={state?.formData.name ?? ""}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={state?.formData.email ?? ""}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Notes:
              </label>
              <textarea
                value={state?.formData.notes ?? ""}
                onChange={(e) => updateFormData("notes", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder="Enter notes..."
              />
            </div>
            <button
              onClick={clearForm}
              className="w-full px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md font-medium transition-colors"
            >
              Clear Form
            </button>
          </div>
        </DemoCard>

        {/* Current State Display */}
        <DemoCard
          title="Current State (Visible to Model)"
          description="This is the state object sent to the AI model"
        >
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3">
            <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
          <div className="mt-3">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Last updated: {state?.lastUpdated ? new Date(state.lastUpdated).toLocaleString() : "Never"}
            </p>
            <button
              onClick={resetAllState}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
            >
              Reset All State
            </button>
          </div>
        </DemoCard>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
          💡 Best Practices
        </h3>
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
          <li>Keep widget state payloads under 4k tokens for best performance</li>
          <li>Only store data that needs to be visible to the AI model</li>
          <li>State persists across widget minimize/restore cycles</li>
          <li>Use for favorites, preferences, form data, or user selections</li>
          <li>State updates are automatic when using setWidgetState</li>
        </ul>
      </div>
    </div>
  );
}
