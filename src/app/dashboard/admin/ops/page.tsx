"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useTradingOps } from "@/hooks/useTradingOps";
import OpsHeader from "./components/OpsHeader";
import QuantConnectionCard from "./components/QuantConnectionCard";
import KillSwitchCard from "./components/KillSwitchCard";
import NavPublishingCard from "./components/NavPublishingCard";
import StrategiesTable from "./components/StrategiesTable";
import OpenPositionsCard from "./components/OpenPositionsCard";
import FlipbotSignalForm from "./components/FlipbotSignalForm";
import ExnessPartnerCard from "./components/ExnessPartnerCard";
import DemoReconciliationCard from "./components/DemoReconciliationCard";
import StrategyLifecycleTable from "./components/StrategyLifecycleTable";

export default function TradingOpsPage() {
  const {
    status,
    flipbot,
    lifecycle,
    loading,
    actionLoading,
    reconHistory,
    flipbotPool,
    exnessPartner,
    signalForm,
    setSignalForm,
    quant,
    killActive,
    loadStatus,
    handleKillSwitch,
    handlePromotionCheck,
    handlePromote,
    handleSyncPositions,
    handleDemoReconciliation,
    handlePushFlipbotSignal,
    handleNavBatch,
  } = useTradingOps();

  return (
    <TranslateTree>
      <div className="space-y-6">
        <OpsHeader loading={loading} onRefresh={loadStatus} />

        <div className="grid md:grid-cols-2 gap-4">
          <QuantConnectionCard connected={status?.connected} quant={quant} />
          <KillSwitchCard
            killActive={killActive}
            quant={quant}
            actionLoading={actionLoading}
            onToggle={handleKillSwitch}
          />
        </div>

        <NavPublishingCard
          actionLoading={actionLoading}
          onRunNavBatch={handleNavBatch}
        />

        <StrategiesTable strategies={quant?.strategies} />

        <OpenPositionsCard positionsCount={quant?.positions?.length} />

        <FlipbotSignalForm
          flipbot={flipbot}
          flipbotPool={flipbotPool}
          signalForm={signalForm}
          setSignalForm={setSignalForm}
          actionLoading={actionLoading}
          onSubmit={handlePushFlipbotSignal}
        />

        <ExnessPartnerCard exnessPartner={exnessPartner} />

        <DemoReconciliationCard
          reconHistory={reconHistory}
          actionLoading={actionLoading}
          onSyncPositions={handleSyncPositions}
          onRunReconciliation={handleDemoReconciliation}
        />

        <StrategyLifecycleTable
          lifecycle={lifecycle}
          strategies={quant?.strategies}
          actionLoading={actionLoading}
          onPromotionCheck={handlePromotionCheck}
          onPromote={handlePromote}
        />
      </div>
    </TranslateTree>
  );
}
