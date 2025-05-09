namespace DevelopmentTracker.Server.Model
{
    public class Developments
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? DevelopmentType { get; set; }
        public string? Description { get; set; }

        public string? Status { get; set; }

        public DateTime? DueDate {  get; set; }

        public DateTime? ImplementationDate { get; set; }

        public string? version {  get; set; }




    }
}
