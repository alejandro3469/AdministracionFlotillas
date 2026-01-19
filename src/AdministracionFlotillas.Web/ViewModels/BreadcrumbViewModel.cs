namespace AdministracionFlotillas.Web.ViewModels;

public class BreadcrumbViewModel
{
    public List<BreadcrumbItem> Items { get; set; } = new List<BreadcrumbItem>();
}

public class BreadcrumbItem
{
    public string Text { get; set; } = string.Empty;
    public string? Url { get; set; }
    public string? Contador { get; set; }
}
