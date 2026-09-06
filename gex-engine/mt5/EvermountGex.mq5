#property copyright "Evermount Capital"
#property version   "1.00"
#property description "Marks live GEX/COT gold positioning on XAUUSD from the local engine."

input string InpEngineUrl = "http://127.0.0.1:8088/api/mt5";
input int    InpRefreshSec = 15;
input bool   InpDrawFuturesLine = true;
input bool   InpDrawLevels = true;

string g_prefix = "EMGEX_";

int OnInit()
{
   if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED) && !MQLInfoInteger(MQL_TESTER))
      Print("Enable Algo Trading if objects do not update.");
   EventSetTimer(MathMax(5, InpRefreshSec));
   OnTimer();
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   EventKillTimer();
   ObjectsDeleteAll(0, g_prefix);
   Comment("");
}

void OnTick()
{
}

void OnTimer()
{
   string json;
   if(!FetchJson(InpEngineUrl, json))
      return;
   ApplyOverlay(json);
}

bool FetchJson(const string url, string &json)
{
   char data[];
   char result[];
   string result_headers;
   ResetLastError();
   int code = WebRequest("GET", url, "Accept: application/json\r\n", 8000, data, result, result_headers);
   if(code == -1)
   {
      int err = GetLastError();
      string msg = "WebRequest failed err=" + IntegerToString(err);
      if(err == 4014 || err == 4060)
         msg += " | Add http://127.0.0.1:8088 in Tools > Options > Expert Advisors > Allow WebRequest";
      Comment(msg);
      Print(msg);
      return false;
   }
   if(code != 200)
   {
      Comment("Engine HTTP " + IntegerToString(code) + " — is uvicorn running on :8088?");
      return false;
   }
   json = CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8);
   return StringLen(json) > 0;
}

void ApplyOverlay(const string json)
{
   double spot = JsonNumber(json, "spot");
   double futures = JsonNumber(json, "futures");
   double basis = JsonNumber(json, "basis");
   double swap_net = JsonNumber(json, "swap_net");
   double mm_net = JsonNumber(json, "mm_net");
   double prod_net = JsonNumber(json, "prod_net");
   double gamma_flip = JsonNumber(json, "gamma_flip");
   double max_pain = JsonNumber(json, "max_pain");
   string bias = JsonString(json, "bias");
   string report = JsonString(json, "report_date");
   string note = JsonString(json, "note");
   string regime = JsonString(json, "regime");

   color panel = (swap_net < 0) ? C'201,147,58' : C'70,130,180';
   string text =
      "EVERMOUNT GOLD POSITIONING\n" +
      "Spot " + DoubleToString(spot, 2) +
      "   |   COMEX " + DoubleToString(futures, 2) +
      "   |   Basis " + DoubleToString(basis, 2) + "\n" +
      "Swap dealers NET  " + DoubleToString(swap_net, 0) + "\n" +
      "Managed money NET " + DoubleToString(mm_net, 0) + "\n" +
      "Producers NET     " + DoubleToString(prod_net, 0) + "\n" +
      bias + "   COT " + report + "\n" +
      (regime != "" ? ("Regime " + regime + "\n") : "") +
      note;

   Comment(text);
   DrawLabel("panel", 12, 22, text, panel);

   if(InpDrawFuturesLine && futures > 0)
      DrawHLine("futures", futures, C'255,200,40', "COMEX dealer " + DoubleToString(futures, 2));
   if(InpDrawFuturesLine && spot > 0)
      DrawHLine("spot", spot, C'80,220,120', "XAU spot " + DoubleToString(spot, 2));
   double flow_low = JsonNumber(json, "flow_low");
   double flow_high = JsonNumber(json, "flow_high");
   double flow2_low = JsonNumber(json, "flow2_low");
   double flow2_high = JsonNumber(json, "flow2_high");
   double basis_low = JsonNumber(json, "basis_low");
   double basis_high = JsonNumber(json, "basis_high");
   datetime t1 = iTime(_Symbol, PERIOD_CURRENT, 80);
   datetime t2 = TimeCurrent() + PeriodSeconds() * 30;
   if(t1 <= 0)
      t1 = TimeCurrent() - PeriodSeconds() * 80;
   DrawZone("z2", t1, t2, flow2_high, flow2_low, C'70,70,90');
   DrawZone("z1", t1, t2, flow_high, flow_low, C'180,110,30');
   DrawZone("basis", t1, t2, basis_high, basis_low, C'40,110,70');
   if(flow_high > 0)
      DrawHLine("flow_h", flow_high, C'255,140,0', "+1 ATR " + DoubleToString(flow_high, 2));
   if(flow_low > 0)
      DrawHLine("flow_l", flow_low, C'255,140,0', "-1 ATR " + DoubleToString(flow_low, 2));
   if(InpDrawLevels && gamma_flip > 0)
      DrawHLine("flip", gamma_flip, clrMagenta, "Gamma flip " + DoubleToString(gamma_flip, 2));
   if(InpDrawLevels && max_pain > 0)
      DrawHLine("pain", max_pain, clrDodgerBlue, "Max pain " + DoubleToString(max_pain, 2));
   ChartRedraw(0);
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

void DrawHLine(const string id, const double price, const color clr, const string caption)
{
   string name = g_prefix + id;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_HLINE, 0, 0, price);
   ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_STYLE, STYLE_SOLID);
   ObjectSetInteger(0, name, OBJPROP_WIDTH, 2);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetString(0, name, OBJPROP_TEXT, caption);
   ObjectSetString(0, name, OBJPROP_TOOLTIP, caption);
}

void DrawZone(const string id, const datetime t1, const datetime t2, const double p1, const double p2, const color clr)
{
   if(p1 <= 0 || p2 <= 0)
      return;
   string name = g_prefix + id;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_RECTANGLE, 0, t1, p1, t2, p2);
   ObjectSetInteger(0, name, OBJPROP_TIME, 0, t1);
   ObjectSetInteger(0, name, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 0, p1);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 1, p2);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_FILL, true);
   ObjectSetInteger(0, name, OBJPROP_BACK, true);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

double JsonNumber(const string json, const string key)
{
   string raw = JsonRaw(json, key);
   if(raw == "" || raw == "null")
      return 0.0;
   return StringToDouble(raw);
}

string JsonString(const string json, const string key)
{
   string raw = JsonRaw(json, key);
   StringReplace(raw, "\"", "");
   return raw;
}

string JsonRaw(const string json, const string key)
{
   string pat = "\"" + key + "\":";
   int start = StringFind(json, pat);
   if(start < 0)
      return "";
   start += StringLen(pat);
   int n = StringLen(json);
   while(start < n)
   {
      ushort ch = (ushort)StringGetCharacter(json, start);
      if(ch != ' ' && ch != '\n' && ch != '\r' && ch != '\t')
         break;
      start++;
   }
   if(start >= n)
      return "";
   if((ushort)StringGetCharacter(json, start) == '"')
   {
      int end = StringFind(json, "\"", start + 1);
      if(end < 0)
         return "";
      return StringSubstr(json, start + 1, end - start - 1);
   }
   int end = start;
   while(end < n)
   {
      ushort ch = (ushort)StringGetCharacter(json, end);
      if(ch == ',' || ch == '}' || ch == ' ' || ch == '\n')
         break;
      end++;
   }
   return StringSubstr(json, start, end - start);
}
