import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Trash } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'components/ui/select';
import { Switch } from 'components/ui/switch';
import { Checkbox } from 'components/ui/checkbox';
import { StockSlider } from './stock-slider';
import { categoryOptions, locationOptions, tags } from '../../services/inventory-service';
import { useNavigate } from 'react-router-dom';

// Define the inventory item interface
interface InventoryItem {
  itemName: string;
  category: string;
  supplier: string;
  itemLoc: string;
  price: string;
  status: string;
  stock: number;
  images: string[];
  warranty: boolean;
  replacement: boolean;
  discount: boolean;
  tags: string[];
}

// Stepper component
interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step circle with number */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm mb-2 ${
                  index <= currentStep ? 'bg-teal-500' : 'bg-gray-200'
                } ${index < currentStep ? 'cursor-pointer' : ''}`}
                onClick={() => index < currentStep && onStepChange(index)}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center">{step}</span>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4">
                <div className={`h-full ${index < currentStep ? 'bg-teal-500' : 'bg-gray-200'}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function InventoryForm() {
  const steps = ['General info', 'Additional info'];
  const [currentStep, setCurrentStep] = useState(0);

  // Initial state with default values
  const [formData, setFormData] = useState<InventoryItem>({
    itemName: '',
    category: categoryOptions[0],
    supplier: '',
    itemLoc: locationOptions[0],
    price: '',
    status: 'active',
    stock: 0,
    images: [],
    warranty: true,
    replacement: true,
    discount: false,
    tags: [],
  });

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [searchTags, setSearchTags] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (field: keyof InventoryItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  // Filter tags based on search
  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(searchTags.toLowerCase()));

  // Handle image deletion
  const handleDeleteImage = (img: string) => {
    const updatedImages = formData.images.filter((image) => image !== img);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
    if (selectedImage === img && updatedImages.length > 0) {
      setSelectedImage(updatedImages[0]);
    }
  };

  // Handle image upload
  const onDrop = (acceptedFiles: File[]) => {
    const remainingSlots = 5 - formData.images.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);
    if (filesToAdd.length > 0) {
      const newImages = filesToAdd.map((file) => URL.createObjectURL(file));
      const newImageArray = [...formData.images, ...newImages];
      setFormData((prev) => ({
        ...prev,
        images: newImageArray,
      }));
      setSelectedImage(newImageArray[newImageArray.length - 1]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  // Step navigation functions
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to your backend or process it as needed
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-[18px] flex items-center text-base text-high-emphasis md:mb-[24px] gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-card/60 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>
        <h3 className="text-2xl font-bold tracking-tight">Add item</h3>
      </div>

      <div className="container mx-auto py-6">
        {/* Stepper component */}
        <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />

        <form onSubmit={handleSubmit}>
          {/* Step 1: General Info */}
          {currentStep === 0 && (
            <Card className="w-full border-none rounded-[4px] shadow-sm mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item Name */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="itemName">Item name</Label>
                      <Input
                        id="itemName"
                        value={formData.itemName}
                        onChange={(e) => handleInputChange('itemName', e.target.value)}
                        placeholder="Enter item name"
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Supplier */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        value={formData.supplier}
                        onChange={(e) => handleInputChange('supplier', e.target.value)}
                        placeholder="Enter supplier"
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="itemLoc">Item location</Label>
                      <Select
                        value={formData.itemLoc}
                        onValueChange={(value) => handleInputChange('itemLoc', value)}
                      >
                        <SelectTrigger id="itemLoc">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="price">Price (CHF)</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                      <Label>Status</Label>
                      <RadioGroup
                        value={formData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active" id="status-active" />
                          <Label htmlFor="status-active" className="cursor-pointer">
                            Active
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="discontinued" id="status-discontinued" />
                          <Label htmlFor="status-discontinued" className="cursor-pointer">
                            Discontinued
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Stock Slider */}
                  <div className="w-full">
                    <Label className="mb-2 block">Stock</Label>
                    <StockSlider
                      value={formData.stock}
                      onChange={(value) => handleInputChange('stock', value)}
                      max={1000}
                    />
                  </div>

                  {/* Images */}
                  <div className="flex flex-col gap-2 w-full">
                    <Label>Image upload</Label>
                    <div className="text-xs text-gray-500 mb-2">
                      *.jpg *.jpeg files up to 200KB, minimum size 400x400px, with a maximum of 5
                      uploads.
                    </div>
                    <div className="flex w-full items-center gap-4">
                      {formData.images.map((img) => (
                        <div key={img} className="relative">
                          <Button
                            onClick={() => handleDeleteImage(img)}
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full w-6 h-6 border"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                          <div className="border rounded-md w-16 h-16 overflow-hidden">
                            <img
                              src={img}
                              alt="Thumbnail"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ))}
                      {formData.images.length < 5 && (
                        <div
                          {...getRootProps()}
                          className="border border-dashed rounded-md w-16 h-16 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <Plus className="text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Additional Info */}
          {currentStep === 1 && (
            <Card className="w-full border-none rounded-[4px] shadow-sm mb-6">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  {/* Warranty */}
                  <div className="flex items-center justify-between">
                    <span>Eligible for warranty</span>
                    <Switch
                      checked={formData.warranty}
                      onCheckedChange={(checked) => handleInputChange('warranty', checked)}
                    />
                  </div>

                  {/* Replacement */}
                  <div className="flex items-center justify-between">
                    <span>Eligible for replacement</span>
                    <Switch
                      checked={formData.replacement}
                      onCheckedChange={(checked) => handleInputChange('replacement', checked)}
                    />
                  </div>

                  {/* Discount */}
                  <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <Switch
                      checked={formData.discount}
                      onCheckedChange={(checked) => handleInputChange('discount', checked)}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col w-full mt-4">
                    <Label className="mb-2">Tags</Label>
                    <div className="relative w-full mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <Input
                        className="w-full pl-10"
                        placeholder="Enter tag name"
                        value={searchTags}
                        onChange={(e) => setSearchTags(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2 border rounded-md p-4 max-h-48 overflow-y-auto">
                      {filteredTags.length > 0 ? (
                        filteredTags.map((tag) => (
                          <div key={tag} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.tags.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                              id={`tag-${tag}`}
                            />
                            <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                              {tag}
                            </Label>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No tags found</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 0 ? undefined : goToPreviousStep}
            >
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={goToNextStep}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Finish
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
