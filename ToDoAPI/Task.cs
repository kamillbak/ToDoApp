namespace ToDoAPI
{
    public class Task
    {
        public int Id { get; set; }

        public int Priority { get; set; } 

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
     
    }

}
