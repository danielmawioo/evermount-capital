#property copyright "Evermount Capital"
#property version   "1.10"
#property indicator_chart_window
#property indicator_plots 0
#property description "Dealer flow zones on XAUUSD: COMEX basis corridor and ATR hedge bands."

input int InpRefreshSec = 5;
input int InpLookbackBars = 80;

string g_prefix = "EMGEXZ_";

int OnInit()
{
   EventSetTimer(MathMax(2, InpRefreshSec));
   OnTimer();
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   EventKillTimer();
   ObjectsDeleteAll(0, g_prefix);
   Comment("");
}

int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
{
   return rates_total;
}

void OnTimer()
{
   string map[];
   if(!LoadOverlay(map))
      return;
   double spot = MapNum(map, "spot");
   double futures = MapNum(map, "futures");
   double atr14 = MapNum(map, "atr14");
   double basis_low = MapNum(map, "basis_low");
   double basis_high = MapNum(map, "basis_high");
   double flow_low = MapNum(map, "flow_low");
   double flow_high = MapNum(map, "flow_high");
   double flow2_low = MapNum(map, "flow2_low");
   double flow2_high = MapNum(map, "flow2_high");
   double swap_net = MapNum(map, "swap_net");
   double mm_net = MapNum(map, "mm_net");
   double prod_net = MapNum(map, "prod_net");
   double gamma_flip = MapNum(map, "gamma_flip");
   double max_pain = MapNum(map, "max_pain");
   string bias = MapStr(map, "bias");
   string report = MapStr(map, "report_date");
   string note = MapStr(map, "note");

   datetime t1 = iTime(_Symbol, PERIOD_CURRENT, MathMin(InpLookbackBars, Bars(_Symbol, PERIOD_CURRENT) - 1));
   datetime t2 = TimeCurrent() + PeriodSeconds() * 30;
   if(t1 <= 0)
      t1 = TimeCurrent() - PeriodSeconds() * InpLookbackBars;

   DrawZone("z2", t1, t2, flow2_high, flow2_low, C'70,70,90');
   DrawZone("z1", t1, t2, flow_high, flow_low, C'180,110,30');
   DrawZone("basis", t1, t2, basis_high, basis_low, C'40,110,70');

   DrawHLine("futures", futures, C'255,200,40', 3, STYLE_SOLID, "COMEX dealer " + DoubleToString(futures, 2));
   DrawHLine("spot", spot, C'50,220,110', 3, STYLE_SOLID, "XAU spot " + DoubleToString(spot, 2));
   DrawHLine("flow_h", flow_high, C'255,140,0', 2, STYLE_DASH, "+1 ATR dealer " + DoubleToString(flow_high, 2));
   DrawHLine("flow_l", flow_low, C'255,140,0', 2, STYLE_DASH, "-1 ATR dealer " + DoubleToString(flow_low, 2));
   DrawHLine("flow2_h", flow2_high, C'180,180,200', 2, STYLE_DOT, "+2 ATR " + DoubleToString(flow2_high, 2));
   DrawHLine("flow2_l", flow2_low, C'180,180,200', 2, STYLE_DOT, "-2 ATR " + DoubleToString(flow2_low, 2));
   DrawPriceTag("futures", futures, C'255,200,40', "COMEX " + DoubleToString(futures, 2));
   DrawPriceTag("spot", spot, C'50,220,110', "SPOT " + DoubleToString(spot, 2));
   DrawPriceTag("flow_h", flow_high, C'255,140,0', "+1ATR " + DoubleToString(flow_high, 2));
   DrawPriceTag("flow_l", flow_low, C'255,140,0', "-1ATR " + DoubleToString(flow_low, 2));
   if(gamma_flip > 0)
      DrawHLine("flip", gamma_flip, clrMagenta, 2, STYLE_SOLID, "Gamma flip " + DoubleToString(gamma_flip, 2));
   if(max_pain > 0)
      DrawHLine("pain", max_pain, clrDodgerBlue, 2, STYLE_SOLID, "Max pain " + DoubleToString(max_pain, 2));

   color panel = (swap_net < 0) ? C'230,180,70' : C'90,160,220';
   string text =
      "DEALER FLOW ZONES\n" +
      "Green band  = spot vs COMEX basis (arb / hedge)\n" +
      "Orange band = COMEX +/- 1 ATR (core dealer flow)\n" +
      "Grey band   = COMEX +/- 2 ATR\n" +
      "Spot " + DoubleToString(spot, 2) + "  COMEX " + DoubleToString(futures, 2) +
      "  ATR " + DoubleToString(atr14, 2) + "\n" +
      "Swap NET " + DoubleToString(swap_net, 0) +
      "  |  MM NET " + DoubleToString(mm_net, 0) +
      "  |  Prod NET " + DoubleToString(prod_net, 0) + "\n" +
      bias + "  COT " + report + "\n" +
      note;
   Comment(text);
   DrawLabel("panel", 12, 24, text, panel);
   ChartRedraw(0);
}

bool LoadOverlay(string &map[])
{
   ArrayResize(map, 0);
   int h = FileOpen("gex_overlay.csv", FILE_READ | FILE_TXT | FILE_ANSI | FILE_SHARE_READ);
   if(h == INVALID_HANDLE)
   {
      Comment("Waiting for dealer overlay file (start gex-engine on :8088)");
      return false;
   }
   while(!FileIsEnding(h))
   {
      string line = FileReadString(h);
      StringTrimLeft(line);
      StringTrimRight(line);
      if(StringLen(line) < 3)
         continue;
      int n = ArraySize(map);
      ArrayResize(map, n + 1);
      map[n] = line;
   }
   FileClose(h);
   return ArraySize(map) > 0;
}

double MapNum(const string &map[], const string key)
{
   return StringToDouble(MapStr(map, key));
}

string MapStr(const string &map[], const string key)
{
   string prefix = key + "=";
   for(int i = 0; i < ArraySize(map); i++)
   {
      if(StringFind(map[i], prefix) == 0)
         return StringSubstr(map[i], StringLen(prefix));
   }
   return "";
}

void DrawZone(const string id, const datetime t1, const datetime t2, const double p1, const double p2, const color clr)
{
   string name = g_prefix + id;
   if(p1 <= 0 || p2 <= 0)
      return;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_RECTANGLE, 0, t1, p1, t2, p2);
   ObjectSetInteger(0, name, OBJPROP_TIME, 0, t1);
   ObjectSetInteger(0, name, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 0, p1);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 1, p2);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_STYLE, STYLE_SOLID);
   ObjectSetInteger(0, name, OBJPROP_WIDTH, 1);
   ObjectSetInteger(0, name, OBJPROP_FILL, true);
   ObjectSetInteger(0, name, OBJPROP_BACK, true);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
}

void DrawHLine(const string id, const double price, const color clr, const int width, const ENUM_LINE_STYLE style, const string caption)
{
   if(price <= 0)
      return;
   string name = g_prefix + id;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_HLINE, 0, 0, price);
   ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_STYLE, style);
   ObjectSetInteger(0, name, OBJPROP_WIDTH, width);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetString(0, name, OBJPROP_TEXT, caption);
   ObjectSetString(0, name, OBJPROP_TOOLTIP, caption);
}

void DrawLabel(const string id, const int x, const int y, const string text, const color clr)
{
   string name = g_prefix + id;
   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
      ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
      ObjectSetInteger(0, name, OBJPROP_ANCHOR, ANCHOR_LEFT_UPPER);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   }
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 9);
   ObjectSetString(0, name, OBJPROP_FONT, "Consolas");
   ObjectSetString(0, name, OBJPROP_TEXT, text);
}

void DrawPriceTag(const string id, const double price, const color clr, const string caption)
{
   if(price <= 0)
      return;
   string name = g_prefix + "tag_" + id;
   datetime t = TimeCurrent();
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_TEXT, 0, t, price);
   ObjectSetInteger(0, name, OBJPROP_TIME, t);
   ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 9);
   ObjectSetInteger(0, name, OBJPROP_ANCHOR, ANCHOR_LEFT);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetString(0, name, OBJPROP_TEXT, "  " + caption);
}
