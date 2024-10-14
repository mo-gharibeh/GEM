namespace GEM.Server.Service
{
    public class PayPalConfigManager
    {
        private readonly Dictionary<string, string> _config;

        public PayPalConfigManager(Dictionary<string, string> config)
        {
            _config = config;
        }

        public string GetClientId()
        {
            return "AfMsQi5UnaC5JCH55LaSR5mqiXgCxiCQl9i5fH1tLLzMjMY_CAcCq_bW0Jng3unAhxZRemIi8ckcHDVT";
        }

        public string GetClientSecret()
        {
            return "EEgjU7uBGthAolDzlcePVEqGExr_HtgJCgq1rBjQ19iROSneU0QVAyXq7DCvuhhWtKHXhL-QNOMeZJxk";
        }

        public string GetMode()
        {
            return "sandbox";
        }
    }
}
