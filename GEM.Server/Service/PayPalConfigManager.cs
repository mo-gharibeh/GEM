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
            return "AZTrBuVKXvnOUkBtbatQHinyCrU5YJw0UMdkL5TP99rNb1uIV-yla77-9RU6ghbGem7Tc_tyGrVyE19Y";
        }

        public string GetClientSecret()
        {
            return "EE7434nHv6ssYrjCjhbo8sApNIuqW1gjeUH2aYbgme09hopFGuoZtPNTD7-a9_SVhq5H7n-vpfMC8lq0";
        }

        public string GetMode()
        {
            return "sandbox";
        }
    }
}
